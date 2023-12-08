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

  function getDisplayTitle(title : string) {
    if (title.length > 7) {
      return title.slice(0, 7) + '...'
    }
    return title
  }

  return (
    <div className="w-full h-full m-auto">
      <div role="tablist" className="tabs tabs-lifted grid-rows-[auto,1fr] h-full">
        {tabs.map((tab: Tab, index : number) => {
          return (
            <>
              <input type="radio" name="my_tabs_2" role="tab" 
                className="tab" 
                onClick={() => setChecked(index)} checked={getChecked(index)} 
                aria-label={getDisplayTitle(tab.name)} 
              />
              <div role="tabpanel" className="tab-content bg-base-300 border-base-300 h-full w-98-percent rounded-box p-6">
                {tab.content}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}