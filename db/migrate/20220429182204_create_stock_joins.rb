class CreateStockJoins < ActiveRecord::Migration[7.0]
  def change
    create_table :stock_joins do |t|
      t.references :stock
      t.references :user

      t.timestamps
    end
  end
end
