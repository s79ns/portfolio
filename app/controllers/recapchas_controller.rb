class RecapchasController < ApplicationController
  require 'uri'
  require 'net/http'

  RECAPTCHA_SECRET_KEY = '6LeevgYaAAAAAFXK44kz3TjRBbqpFwapZJo8P2_y'
  RECAPTCHA_SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

  # POST /login
  def create
    # siteverifyAPIを呼び出してボットかチェック
    siteverify_uri = URI.parse("#{RECAPTCHA_SITEVERIFY_URL}?response=#{params[:recaptcha_response]}&secret=#{RECAPTCHA_SECRET_KEY}")
    response = Net::HTTP.get_response(siteverify_uri)
    json_response = JSON.parse(response.body)

    # reCAPTCHAのレスポンスデータが成功かスコアが0.5以上なら人間のアクションだと判断
    # スコアについては運用中変更する必要がある
    if json_response['success'] && json_response['score'] > 0.5
      user = User.find_by(email: params[:session][:email])
      if user && user.authenticate(params[:session][:password])
        if user.activated?
          # Success
          log_in user
          params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          redirect_back_or user
        else
          message  = "Account not activated. "
          message += "Check your email for the activation link."
          flash[:warning] = message
          redirect_to root_url
        end
      else
        # Failure
        flash.now[:danger] = 'Invalid email/password combination'
        render 'new'
      end
    else
      flash.now[:danger] = '不正アクセスです。'
      render 'new'
    end
  end
end
