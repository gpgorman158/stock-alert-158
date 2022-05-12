class CreateAlertJoins < ActiveRecord::Migration[7.0]
  def change
    create_table :alert_joins do |t|
      t.references :alert
      t.references :user

      t.timestamps
    end
  end
end
