'use client'

import { useState } from "react"

interface Tab {
  name: string,
  content: any
}
export function BasicTabsWithContent({ tabs }: { tabs: Tab[] }) {
  const [checked, setChecked] = useState<number>(0)
  function getChecked(number : number = 0) {
    return number === checked
  }

  async function closeTab(tab: Tab) {
    const newTabs = tabs.filter((t: Tab) => t.name !== tab.name)
  }

  const firstTab = tabs[0]
  const allOtherTabs = tabs.slice(1)

  return (
    <div className="w-full h-full">
      <div role="tablist" className="tabs tabs-lifted grid-rows-[auto,1fr] h-full">
        {tabs.map((tab: Tab, index : number) => {
          return (
            <>
              <input type="radio" name="my_tabs_2" role="tab" className="tab" onClick={() => setChecked(index)} checked={getChecked(index)} aria-label={tab.name} />
              <div role="tabpanel" className="tab-content bg-base-100 border-base-300 h-full rounded-box p-6">
                {tab.content}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}