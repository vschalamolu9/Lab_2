import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyWord, setKeyWord] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }
        else{
            history.push('/')
        }
    }

    return(
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={e => setKeyWord(e.target.value)}
                        placeholder='Search Location...'
                        className='mr-sm-2 ml-sm-5'
                        style={{width: '200px', marginLeft: '25px'}}
                    />
                </Col>
                <Col>
                    <Button type='submit' variant='outline-success' className='p-2'>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBox