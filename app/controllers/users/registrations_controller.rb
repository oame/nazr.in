class Users::RegistrationsController < Devise::RegistrationsController
  def build_resource(*args)
    super

    if session['devise.omniauth']
      @user.apply_omniauth(session['devise.omniauth'])
      @user.name = session['devise.omniauth']['info']['nickname']
      @user.valid?
    end

    session['devise.omniauth'] = nil unless @user.new_record?
  end
end
