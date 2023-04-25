import React, { lazy, Suspense, useState } from 'react'

import { Demo1, Demo2 } from '@/components'

const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

import '@/app.css'

function App() {
    const [count, setCounts] = useState('')
    const [show, setShow] = useState(false)
    alert('111 00')

    const onChange = (e: any) => {
        setCounts(e.target.value)
    }

    const onClick = () => {
        setShow(true)
    }

    return (
        <>
            <h2>webpack5+react+ts 2</h2>
            <p>受控组件</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />

            <>tree shaking</>
            <Demo1 />
            <div>
                <h2 onClick={onClick}>展示33</h2>
                {/* show为true时加载LazyDemo组件 */}
                {show && (
                    <Suspense fallback={null}>
                        <LazyDemo />
                    </Suspense>
                )}
            </div>
        </>
    )
}
export default App
