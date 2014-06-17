class CreateAuthentications < ActiveRecord::Migration
  def change
    create_table :authentications do |t|
      t.references :user, index: true
      t.string :uid
      t.string :provider
      t.string :token
      t.string :token_secret

      t.timestamps
    end
  end
end
