class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.string :sic_description
      t.integer :sic_code

      t.timestamps
    end
  end
end
