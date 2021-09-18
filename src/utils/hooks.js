let isMount = true
let workInProgressHook = null
let hookIndex = 0
let actionIndex = 0

const schedule = () => {
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode()
    isMount = false

    return app
}

const useState = (initialState) => {
    // eslint-disable-next-line no-debugger
    debugger
    let hook
    if (isMount) {
        hook = {
            name: 'hook' + hookIndex++,
            memoizedState: initialState,
            next: null,
            query: {
                pending: null
            }
        }
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook
        }
        else {
            workInProgressHook.next = hook
        }

        workInProgressHook = hook
    } else {
        hook = workInProgressHook
        workInProgressHook = workInProgressHook.next
    }

    let baseState = hook.memoizedState
    if (hook.query.pending) {
        let firstUpdate = hook.query.pending.next
        console.log('=====>', hook, firstUpdate)

        do {
            const action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        } while(firstUpdate !== hook.query.pending.next)
        hook.query.pending = null
    }

    hook.memoizedState = baseState
    return [baseState, dispatchAction.bind(null, hook.query)] // hook.query是dispatchAction执行时的第一个参数
}

const dispatchAction = (query, action) => {
    // eslint-disable-next-line no-debugger
    debugger
    const update = {
        name: 'action' + actionIndex++,
        action,
        next: null
    }

    if (query.pending === null) {
        update.next = update
    } else {
        update.next = query.pending.next
        query.pending.next = update
    }
    query.pending = update

    schedule()
}

const App = () => {
    const [num1] = useState(1)
    const [num2, setNum2] = useState(-1)

    console.log('isMount:', isMount)
    console.log('num + 1:', num1)
    console.log('num - 1:', num2)

    return {
        onClick: () => {
            // setNum1(num => num + 1)
            setNum2(num => num - 1)
            setNum2(num => num - 1)
        }
    }
}


const fiber = {
    stateNode: App,
    memoizedState: null
}

const app = schedule()

export default app
