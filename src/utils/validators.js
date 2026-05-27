export const validateSong = (form) => {
  const errors = {};
  if (!form.title?.trim()) errors.title = "Il titolo è obbligatorio";
  if (!form.artistId) errors.artistId = "Seleziona un artista";
  if (!form.ageGroup) errors.ageGroup = "Seleziona una fascia d'età";
  if (!form.duration?.trim()) errors.duration = "La durata è obbligatoria";
  if (!form.cover?.trim()) errors.cover = "Inserisci una emoji come cover";
  return errors;
};

export const validateLogin = (form) => {
  const errors = {};
  if (!form.username?.trim()) errors.username = "Il nome utente è obbligatorio";
  if (!form.password?.trim()) errors.password = "La password è obbligatoria";
  return errors;
};

export const validateArtist = (form) => {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Il nome è obbligatorio";
  if (!form.genre?.trim()) errors.genre = "Il genere è obbligatorio";
  if (!form.bio?.trim()) errors.bio = "La biografia è obbligatoria";
  if (!form.cover?.trim()) errors.cover = "Inserisci una emoji come cover";
  return errors;
};
