# frozen_string_literal: true

# NOTE: ファイル名に `000_` プレフィックスを付与することで、この initializer を他の initializer よりも先に読み込むようにしています。
#   lib 配下の monkey patch は、アプリケーションや他の initializer から利用されるクラス／メソッドの挙動を書き換えるため、依存コードより前に読み込む必要があります。

Rails.root.glob('lib/monkey_patch/**/*.rb').sort.each do |file|
  require file
end
