class UsersController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: :create

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] ||= user.id
            render json: user, status: :created
        else
            puts errors: user.errors.full_messages
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        render json: user, status: :created
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(user_params)
        render json: user, status: :ok
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end


    private
    def user_params
        params.permit(:name, :email, :phone, :password, :password_confirmation, :subscription)
    end
end
