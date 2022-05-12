class User < ApplicationRecord
    has_secure_password
    has_many :stock_joins
    has_many :stocks, through: :stock_joins
end
