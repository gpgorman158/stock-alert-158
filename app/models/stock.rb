class Stock < ApplicationRecord
    has_many :stock_joins
    has_many :users, through: :stock_joins
    validates :ticker, uniqueness: true
end
