import {
  createContext,
  useState
} from 'react'

import {
  Toast,
  ToastContainer
} from 'react-bootstrap'

const NotificationContext = createContext()

export function NotificationProvider({
  children
}) {
  const [
    notification,
    setNotification
  ] = useState({
    show: false,
    message: '',
    type: 'success'
  })

  const showNotification = (
    message,
    type = 'success'
  ) => {
    setNotification({
      show: true,
      message,
      type
    })
  }

  const hideNotification = () => {
    setNotification((current) => ({
      ...current,
      show: false
    }))
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification
      }}
    >
      {children}

      <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          position: 'fixed',
          zIndex: 9999
        }}
      >
        <Toast
          show={notification.show}
          onClose={hideNotification}
          delay={2200}
          autohide
          bg={
            notification.type === 'danger'
              ? 'danger'
              : notification.type === 'warning'
                ? 'warning'
                : 'success'
          }
        >
          <Toast.Header>
            <strong className="me-auto">
              ShopNest
            </strong>
          </Toast.Header>

          <Toast.Body
            className={
              notification.type === 'warning'
                ? 'text-dark'
                : 'text-white'
            }
          >
            {notification.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </NotificationContext.Provider>
  )
}

export default NotificationContext