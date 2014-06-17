class LinksController < ApplicationController
  before_action :authenticate_user!, except: %i(new create show go)
  before_action :set_link, only: [:show, :edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token, only: :create

  # GET /links
  def index
    @links = Link.all
  end

  # GET /links/1
  def show
  end

  def go
    @link = Link.find_by(token: params[:token])
    @link.view!
    redirect_to @link.address, status: :moved_permanently
  end

  # GET /links/new
  def new
    @link = Link.new
  end

  # GET /links/1/edit
  def edit
  end

  # POST /links
  def create
    @link = Link.new(link_params)

    if @link.save
      render text: link_url(@link)
    else
      redirect_to new_link_path
    end
  end

  # PATCH/PUT /links/1
  def update
    if @link.update(link_params)
      redirect_to @link, notice: 'Link was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /links/1
  def destroy
    @link.destroy
    redirect_to links_url, notice: 'Link was successfully destroyed.'
  end

  private

  def set_link
    @link = Link.find(params[:id])
  end

  def link_params
    params.require(:link).permit(:address)
  end
end
