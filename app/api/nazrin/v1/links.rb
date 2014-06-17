class Nazrin::V1::Links < Grape::API
  resource :links do

    # GET /api/v1/links/:id
    get ':id', rabl: 'link' do
      @link = Link.find(params[:id])
    end

    # POST /api/v1/links
    post '/', rabl: 'link' do
      @link = Link.new(permitted_params)
      @link.user = current_user
      @link.save
    end
  end

end
