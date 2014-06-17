class Users::AuthenticationsController < Devise::OmniauthCallbacksController
  def twitter
    omniauth_data = request.env['omniauth.auth']
    authentication = Authentication.where(provider: omniauth_data['provider'], uid: omniauth_data['uid']).first

    if authentication
      flash[:notice] = t('devise.sessions.signed_in')
      sign_in_and_redirect User.find(authentication.user_id)
    elsif current_user
      token = omniauth_data['credentials'].token
      token_secret = omniauth_data['credentials'].secret

      current_user.authentications.create!(
                                           provider: omniauth_data['provider'],
                                           uid: omniauth_data['uid'],
                                           token: token,
                                           token_secret: token_secret)
      flash[:notice] = t('devise.omniauth_callbacks.success')
      sign_in_and_redirect current_user
    else
      user = User.new
      user.apply_omniauth(omniauth_data)

      if user.save
        flash[:notice] = t('devise.sessions.signed_in')
        sign_in_and_redirect User.find(user.id)
      else
        session['devise.omniauth'] = omniauth_data.except('extra')
        redirect_to new_user_registration_path
      end
    end
    # @user = User.find_for_twitter_oauth(request.env["omniauth.auth"], current_user) || User.new

    # if @user.persisted?
    #   # set_flash_message(:notice, :success, :kind => "Twitter") if is_navigational_format?
    #   sign_in_and_redirect @user, :event => :authentication
    # else
    #   session["devise.omniauh"] = request.env["omniauth.auth"].except("extra")
    #   redirect_to new_user_registration_url
    # end
  end

  def destroy
    raise
  end
end
