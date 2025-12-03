import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow h-16 flex items-center px-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Site</h1>
      </header>
      <div className="flex flex-1">
        {/* サイドバー */}
        <aside className="w-64 bg-gray-800 text-gray-100 shrink-0">
          <nav className="h-full px-4 py-6">
            <ul className="space-y-4">
              <li>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
                  ホーム
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        {/* メインコンテンツ */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
