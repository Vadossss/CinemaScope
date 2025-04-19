import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";

export default function App({movieId}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="mt-2">
            <Button onPress={onOpen} className="bg-gray-300 pr-3 pl-2" variant="bordered">
                Оценить фильм
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Оценить фильм</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                    nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                    deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="primary" onPress={onClose}>
                                    Оценить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}