require "spec_helper"

describe LinksController do
  describe "routing" do

    it "routes to #index" do
      get("/links").should route_to("links#index")
    end

    it "routes to #new" do
      get("/links/new").should route_to("links#new")
    end

    it "routes to #show" do
      get("/links/1").should route_to("links#show", :id => "1")
    end

    it "routes to #edit" do
      get("/links/1/edit").should route_to("links#edit", :id => "1")
    end

    it "routes to #create" do
      post("/links").should route_to("links#create")
    end

    it "routes to #update" do
      put("/links/1").should route_to("links#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/links/1").should route_to("links#destroy", :id => "1")
    end

  end
end
