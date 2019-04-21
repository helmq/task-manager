class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task.all
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])

    json = {
      items: tasks.map { |t| TaskSerializer.new(t).as_json },
      meta: build_meta_tasks(tasks)
    }

    respond_with json
  end

  def build_meta_tasks(collection)
    {
      count: collection.count,
      total_count: collection.total_count,
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      per_page: collection.limit_value
    }
  end
end
