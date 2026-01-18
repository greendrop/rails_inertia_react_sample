# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Article do
  describe 'enums' do
    it { is_expected.to define_enum_for(:status).with_values(draft: 0, published: 1) }
  end

  describe 'validations' do
    describe 'title' do
      it { is_expected.to validate_presence_of(:title) }
      it { is_expected.to validate_length_of(:title).is_at_most(255) }
    end

    describe 'body' do
      it { is_expected.to validate_presence_of(:body) }
    end

    describe 'status' do
      it { is_expected.to validate_presence_of(:status) }
    end
  end
end
