import {
  PlusIcon
} from '@heroicons/react/24/outline';
import {
  Link,
  Button,
  ButtonGroup
} from '@nextui-org/react'


export function ActionButtons({ id }: { id: string }) {
  // const deleteListWithId = deleteList.bind(null, id);
  // return (
  //   <form action={deleteListWithId}>
  //     <ButtonGroup>
  //     <Tooltip content='Produtos'>
  //       <Button
  //           isIconOnly
  //           href={`/main/lists/${id}/productList`}
  //           as={Link}
  //           variant='light'
  //         >
  //           <ClipboardDocumentIcon className="w-5" />
  //         </Button>
  //       </Tooltip>

  //       <Tooltip content='Editar'>
  //         <Button
  //           isIconOnly
  //           href={`/main/lists/${id}/edit`}
  //           as={Link}
  //           variant='light'
  //         >
  //           <PencilIcon className="w-5" />
  //         </Button>
  //       </Tooltip>

  //       <Tooltip content='Excluir'>
  //         <Button
  //           isIconOnly
  //           type='submit'
  //           color='danger'
  //           variant='light'
  //         >
  //           <TrashIcon className="w-5" />
  //         </Button>
  //       </Tooltip>
  //     </ButtonGroup>
  //   </form>
  // );
}

export function MainPageButtons({ listId }: { listId: string }) {
  return (
    <ButtonGroup>
      <Button
        href={`/main/lists/${listId}/product-list/add-all`}
        color='secondary'
        as={Link}
        startContent={<PlusIcon className="w-5" />}
      >
        Todos Produtos
      </Button>

    </ButtonGroup>
  );
}
