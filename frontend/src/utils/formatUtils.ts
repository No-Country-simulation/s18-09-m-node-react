export const formatDateToDDMMYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const year = String(date.getFullYear()).slice(-2); // Obtiene los últimos 2 dígitos del año

  return `${day}/${month}/${year}`;
};

export const formatDurationFromMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hrs ${remainingMinutes} min`;
};
