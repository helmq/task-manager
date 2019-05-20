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

task_states = %i[new_task in_development in_qa in_code_review ready_for_release released archived]
30.times do |i|
  task = Task.find_or_create_by(name: "Task #{i}", state: task_states.sample)
  task.description = "#{task.name} description"
  task.author = Manager.find(Manager.pluck(:id).sample)
  task.assignee = Developer.find(Developer.pluck(:id).sample)
  task.save
end
