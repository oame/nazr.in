class LinksController < ApplicationController
  before_action :authenticate_user!, except: [:new, :create, :show, :go]
  before_action :set_link, only: [:show, :edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token, only: :create

  permits :address

  # GET /links
  def index
    @links = Link.all
  end

  # GET /links/1
  def show
  end

  def go(token)
    @link = Link.find_by(token: token)
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
  def create(link)
    @link = Link.new(link)

    if @link.save
      render text: link_url(@link)
    else
      redirect_to new_link_path
    end
  end

  # PATCH/PUT /links/1
  def update(link)
    if @link.update(link)
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
end
