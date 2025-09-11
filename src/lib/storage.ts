export const getJSON = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const setJSON = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const remove = (key: string): void => {
  localStorage.removeItem(key);
};

// Internship-specific storage functions
export const getSavedInternships = (): string[] => {
  return getJSON<string[]>('ys_saved') || [];
};

export const saveInternship = (internshipId: string): void => {
  const saved = getSavedInternships();
  if (!saved.includes(internshipId)) {
    setJSON('ys_saved', [...saved, internshipId]);
  }
};

export const unsaveInternship = (internshipId: string): void => {
  const saved = getSavedInternships();
  setJSON('ys_saved', saved.filter(id => id !== internshipId));
};

export const isInternshipSaved = (internshipId: string): boolean => {
  const saved = getSavedInternships();
  return saved.includes(internshipId);
};