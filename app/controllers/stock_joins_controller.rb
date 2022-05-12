class StockJoinsController < ApplicationController

    def create
        stock_join = StockJoin.create!(stock_join_params)
        render json: stock_join, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def custom_destroy
        join = StockJoin.where(stock_id: params[:stock_id], user_id: params[:user_id])
        join.delete_all
        render json: {message: "record deleted"}, status: :accepted
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end


    private
    def stock_join_params
        params.permit(:user_id, :stock_id)
    end
end
