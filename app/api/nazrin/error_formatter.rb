module Nazrin
  module ErrorFormatter
    def self.call message, backtrace, options, env
      {
        error: {
          code: options[:default_status],
          message: message
        }
      }.to_json
    end
  end
end
