class StockSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :sic_code, :sic_description
end
