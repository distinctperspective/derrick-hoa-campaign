/**
 * Generates a display name for an endorsement based on user information
 * @param name The user's full name
 * @param address The user's address (street name)
 * @returns A formatted display name string
 */
export function generateDisplayName(name?: string | null, address?: string | null): string {
  if (!name && !address) return 'Anonymous';
  
  // Extract street name from address
  let streetName = 'the Community';
  if (address) {
    // Simple parsing to get street name - assumes format like "123 Main Street"
    const addressParts = address.split(' ');
    if (addressParts.length > 1) {
      // Remove house number (first part) and join the rest
      streetName = addressParts.slice(1).join(' ');
    }
  }
  
  // Generate initials from name
  let initials = '';
  if (name) {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      // Get first initial of first name and first initial of last name
      initials = `${nameParts[0][0]}.${nameParts[nameParts.length - 1][0]}.`;
    } else if (nameParts.length === 1) {
      initials = `${nameParts[0][0]}.`;
    }
  }
  
  return `Resident on ${streetName} - ${initials}`;
}
