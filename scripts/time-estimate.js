/**
 * 
 * @param {number | string} c Certainty
 * @param {number | string} d Duties
 * @param {number | string} m Mastery
 * @param {number | string} r Roles
 * @param {number | string} s Size
 * @param {number | string} t Teamwork
 * 
 * @return {{ upperHours: number, upperWeeks: number, lowerHours: number, lowerWeeks: number }} range
 */
function calculateTime(c, d, m, r, s, t) {
  const hoursPerWeek = 40;

  c = Number(c);
  d = Number(d);
  m = Number(m);
  r = Number(r);
  s = Number(s);
  t = Number(t);

  const baseHours = (r * d);
  const masteryGap = (baseHours * (1 - m));
  const teamworkGap = (baseHours * (1 - t));
  const size = (baseHours * (s))
  const hours = baseHours + masteryGap + teamworkGap + size;

  const estimate = Math.round(hours * 2);
  const hourRange = Math.round((1 - c) * estimate);

  const upperHours = estimate + hourRange;
  const lowerHours = estimate - hourRange;
  const lowerWeeks = lowerHours / hoursPerWeek;
  const upperWeeks = upperHours / hoursPerWeek;
  return { upperHours, upperWeeks, lowerHours, lowerWeeks };
}