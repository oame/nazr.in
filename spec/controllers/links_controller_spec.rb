require 'spec_helper'

describe LinksController do

  # This should return the minimal set of attributes required to create a valid
  # Link. As you add validations to Link, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) { { "generated_url" => "MyString" } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # LinksController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all links as @links" do
      link = Link.create! valid_attributes
      get :index, {}, valid_session
      assigns(:links).should eq([link])
    end
  end

  describe "GET show" do
    it "assigns the requested link as @link" do
      link = Link.create! valid_attributes
      get :show, {:id => link.to_param}, valid_session
      assigns(:link).should eq(link)
    end
  end

  describe "GET new" do
    it "assigns a new link as @link" do
      get :new, {}, valid_session
      assigns(:link).should be_a_new(Link)
    end
  end

  describe "GET edit" do
    it "assigns the requested link as @link" do
      link = Link.create! valid_attributes
      get :edit, {:id => link.to_param}, valid_session
      assigns(:link).should eq(link)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Link" do
        expect {
          post :create, {:link => valid_attributes}, valid_session
        }.to change(Link, :count).by(1)
      end

      it "assigns a newly created link as @link" do
        post :create, {:link => valid_attributes}, valid_session
        assigns(:link).should be_a(Link)
        assigns(:link).should be_persisted
      end

      it "redirects to the created link" do
        post :create, {:link => valid_attributes}, valid_session
        response.should redirect_to(Link.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved link as @link" do
        # Trigger the behavior that occurs when invalid params are submitted
        Link.any_instance.stub(:save).and_return(false)
        post :create, {:link => { "generated_url" => "invalid value" }}, valid_session
        assigns(:link).should be_a_new(Link)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Link.any_instance.stub(:save).and_return(false)
        post :create, {:link => { "generated_url" => "invalid value" }}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested link" do
        link = Link.create! valid_attributes
        # Assuming there are no other links in the database, this
        # specifies that the Link created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Link.any_instance.should_receive(:update).with({ "generated_url" => "MyString" })
        put :update, {:id => link.to_param, :link => { "generated_url" => "MyString" }}, valid_session
      end

      it "assigns the requested link as @link" do
        link = Link.create! valid_attributes
        put :update, {:id => link.to_param, :link => valid_attributes}, valid_session
        assigns(:link).should eq(link)
      end

      it "redirects to the link" do
        link = Link.create! valid_attributes
        put :update, {:id => link.to_param, :link => valid_attributes}, valid_session
        response.should redirect_to(link)
      end
    end

    describe "with invalid params" do
      it "assigns the link as @link" do
        link = Link.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Link.any_instance.stub(:save).and_return(false)
        put :update, {:id => link.to_param, :link => { "generated_url" => "invalid value" }}, valid_session
        assigns(:link).should eq(link)
      end

      it "re-renders the 'edit' template" do
        link = Link.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Link.any_instance.stub(:save).and_return(false)
        put :update, {:id => link.to_param, :link => { "generated_url" => "invalid value" }}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested link" do
      link = Link.create! valid_attributes
      expect {
        delete :destroy, {:id => link.to_param}, valid_session
      }.to change(Link, :count).by(-1)
    end

    it "redirects to the links list" do
      link = Link.create! valid_attributes
      delete :destroy, {:id => link.to_param}, valid_session
      response.should redirect_to(links_url)
    end
  end

end
