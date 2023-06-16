

import { Dropdown } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { useEffect } from 'react';
import { RootState } from '../../redux/store/store';
import { getAllCategory } from '../../redux/thunks/goodThunks/getAllCategory.thunk';


export default function InlineDropdown() {
  const category = useAppSelector((state: RootState) => state.good.category)
  const dispatch = useAppDispatch();
  console.log(category);
  
  useEffect(() => {
    dispatch(getAllCategory())
}, [])


  
  return (
    <Dropdown
      class='bg-green-300 rounded-lg'
      label="Каталог"
      placement="bottom"
    >
      {category && category.map((el) =>(
            <Dropdown key={el.id} id={el.id} class='bg-green-300 rounded-lg'
            label={el.fullName}
            placement="right-start"
          >
            {el.SubCategories.map((element) => (

            <Dropdown.Item key={element.id} id={element.id}>
              {element.fullName}
            </Dropdown.Item>
            ))}
            
        
          </Dropdown>

      ))}
          </Dropdown>
            )
          }
          