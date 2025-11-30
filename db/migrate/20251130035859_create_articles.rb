# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[8.1]
  def change
    create_table :articles do |t|
      t.timestamps

      t.string :title, null: false
      t.text :body, null: false
      t.integer :status, null: false, default: 0
      t.datetime :published_at
    end
  end
end
