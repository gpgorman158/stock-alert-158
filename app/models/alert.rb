class Alert < ApplicationRecord
    has_many :alert_joins
    has_many :users, through: :alert_joins
end
