class CreateAlerts < ActiveRecord::Migration[7.0]
  def change
    create_table :alerts do |t|
      t.string :alert_name
      t.string :param_one
      t.string :param_two

      t.timestamps
    end
  end
end
