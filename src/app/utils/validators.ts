import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Allows all Unicode letters, spaces, apostrophe, dot (for initials/titles), and hyphen. */
const ALLOWED_NAME_CHARS_REGEX = /^[\p{L}\s'.-]+$/u;

/** Requires at least one Unicode letter per name part. */
const CONTAINS_LETTER_REGEX = /\p{L}/u;

/**
 * 1. Local part: letters, digits, allowed characters
 * 2. Domain part: letters, digits, hyphens
 * 3. TLD: at least 2 letters (e.g. .de, .com, .cloud)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-*]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Checks the whitespace-separated parts of a name: at least two parts (first and last name),
 * each containing a real letter (blocks isolated `-`, `.`, etc.).
 *
 * @param parts - Name split at whitespace.
 * @returns ValidationErrors if invalid, or null if valid.
 */
function validateNameParts(parts: string[]): ValidationErrors | null {
  if (parts.length < 2) return { missingFullName: true };
  for (const part of parts) {
    if (!CONTAINS_LETTER_REGEX.test(part)) return { invalidPartStructure: true };
  }
  return null;
}

/**
 * Validator for full names: allowed characters, titles (Prof., Dr. etc.),
 * max. 75 characters, first and last name required.
 *
 * @returns Angular ValidatorFn enforcing full name constraints.
 */
export function customNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;
    if (!rawValue) return null;
    const value = rawValue.trim();

    if (!ALLOWED_NAME_CHARS_REGEX.test(value)) return { invalidNameChars: true };
    if (value.length > 75) {
      return { maxLength: { requiredLength: 75, actualLength: value.length } };
    }
    return validateNameParts(value.split(/\s+/));
  };
}

/**
 * Checks that no label of the mail domain is empty or starts/ends with a hyphen.
 *
 * @param mail - Lower-cased mail address.
 * @returns True if domain contains invalid labels, false otherwise.
 */
function hasInvalidDomainLabel(mail: string): boolean {
  const domainPart = mail.split('@')[1];
  if (!domainPart) return false;
  return domainPart
    .split('.')
    .some((label: string) => label.startsWith('-') || label.endsWith('-') || label.length === 0);
}

/**
 * Validator for the mail format: trims the value before validation,
 * checks local part, domain labels and TLD with at least 2 letters.
 *
 * @returns Angular ValidatorFn enforcing email address syntax.
 */
export function customMailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;
    if (!rawValue) return null;
    const value = rawValue.trim().toLowerCase();

    if (!EMAIL_REGEX.test(value)) return { invalidMailFormat: true };
    return hasInvalidDomainLabel(value) ? { invalidMailDomain: true } : null;
  };
}
