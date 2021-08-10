import './Title.css'

const Title = ({children, tag:Tag}) => {
    return (
        <Tag className="Title">{children}</Tag>
    )
}

export default Title