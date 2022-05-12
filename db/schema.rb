# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_29_182204) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alert_joins", force: :cascade do |t|
    t.bigint "alert_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alert_id"], name: "index_alert_joins_on_alert_id"
    t.index ["user_id"], name: "index_alert_joins_on_user_id"
  end

  create_table "alerts", force: :cascade do |t|
    t.string "alert_name"
    t.string "param_one"
    t.string "param_two"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stock_joins", force: :cascade do |t|
    t.bigint "stock_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_id"], name: "index_stock_joins_on_stock_id"
    t.index ["user_id"], name: "index_stock_joins_on_user_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "ticker"
    t.string "sic_description"
    t.integer "sic_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "password_digest"
    t.boolean "subscription"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
