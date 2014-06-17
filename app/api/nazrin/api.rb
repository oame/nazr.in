class Nazrin::API < Grape::API
  # Format
  format :json
  formatter :json, Grape::Formatter::Rabl

  # Error catching
  rescue_from :all, backtrace: true
  error_formatter :json, ErrorFormatter

  helpers do
    def warden
      env['warden']
    end

    def authenticated
      if warden.authenticated?
        return true
      else
        error!('401 Unauthorized', 401)
      end
    end

    def current_user
      warden.user
    end

    def permitted_params
      @permitted_params ||= declared(params, include_missing: false)
    end
  end

  mount V1::Base
end
