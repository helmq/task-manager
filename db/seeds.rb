admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.find_or_create_by(email: "email#{i}@mail.gen")
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = i.to_s
  u.save
end
