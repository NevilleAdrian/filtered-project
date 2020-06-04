
module.exports.filtered = function(users, a) { 
  return users.filter(b =>
    b.car_model_year >= a.start_year && b.car_model_year <= a.end_year
    && (a.gender ? b.gender.toLowerCase() === a.gender.toLowerCase() : true)
    && a.countries.map(c => c.toLowerCase()).includes(b.country.toLowerCase())
    && a.colors.map(c => c.toLowerCase()).includes(b.car_color.toLowerCase())
  )
}