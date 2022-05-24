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
        render json: stock, status: :accepted
    end

    def update
        stock = Stock.find_by(id: params[:id])
        stock.update(stock_params)
        render json: stock, status: :accepted
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    private
    def stock_params
        params.permit(:id, :ticker, :sic_description, :sic_code)
    end
end
