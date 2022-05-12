class StocksController < ApplicationController


    def index
        render json: Stock.all, status: :ok
    end

    def create
        stock = Stock.create!(stock_params)
        render json: stock, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def show
        stock = Stock.find_by(ticker: params[:ticker])
        # debugger
        render json: stock, status: :accepted
    end

    private
    def stock_params
        params.permit(:ticker, :sic_description, :sic_code)
    end
end
