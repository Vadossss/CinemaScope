import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import {useState} from "react";
import {useAuth} from "@/app/contexts/authContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const IconSettings = ({className}) => {
    return (
        <svg className={className} fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,13.743l-1,.579a1,1,0,0,0-.366,1.366l1.488,2.578a1,1,0,0,0,1.366.366L6.5,18.05a1.987,1.987,0,0,1,1.986,0l.02.011a1.989,1.989,0,0,1,1,1.724V21a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V19.782a1.985,1.985,0,0,1,.995-1.721l.021-.012a1.987,1.987,0,0,1,1.986,0l1.008.582a1,1,0,0,0,1.366-.366l1.488-2.578A1,1,0,0,0,21,14.322l-1-.579a1.994,1.994,0,0,1-1-1.733v-.021a1.991,1.991,0,0,1,1-1.732l1-.579a1,1,0,0,0,.366-1.366L19.876,5.734a1,1,0,0,0-1.366-.366L17.5,5.95a1.987,1.987,0,0,1-1.986,0L15.5,5.94a1.989,1.989,0,0,1-1-1.724V3a1,1,0,0,0-1-1h-3a1,1,0,0,0-1,1V4.294A1.856,1.856,0,0,1,8.57,5.9l-.153.088a1.855,1.855,0,0,1-1.853,0L5.49,5.368a1,1,0,0,0-1.366.366L2.636,8.312A1,1,0,0,0,3,9.678l1,.579A1.994,1.994,0,0,1,5,11.99v.021A1.991,1.991,0,0,1,4,13.743ZM12,9a3,3,0,1,1-3,3A3,3,0,0,1,12,9Z"/>\
        </svg>
    )
}

export default function App() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const {refreshAuth, setAvatar, avatar, username, setUsername} = useAuth();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Пожалуйста, выберите файл для загрузки');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${BASE_URL}/user_settings/uploadAvatar`, {
                method: 'POST',
                body: formData,
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла');
            }

            const data = await response.json();
            setAvatar(data.downloadUri);
            setAvatarUrl(data.downloadUri);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }

        // if (username !== usernameLabel && usernameLabel.length > 4) {
        //     const fetch = async () => {
        //         await fetchUpdateUsername(usernameLabel);
        //     }
        //     await fetch();
        // }


    };

    return (
        <>
            <Button
                className="flex gap-1 px-3 bg-gray-200 hover:bg-orange-500 hover:text-white transition ease-in delay-100 group"
                onPress={onOpen}>
                <IconSettings className="group-hover:fill-white transition ease-in delay-100"/>
                Настройки
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Настройки</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src={imagePreview !== null ? imagePreview : avatar !== null ? avatar : "/icon_avatar1.png"}
                                        alt="Фото профиля"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                    />
                                    <label htmlFor="photo"
                                           className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 text-sm">
                                        Выбрать фото
                                    </label>
                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={handleUpload}
                                    isDisabled={selectedFile === null}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
                                >
                                    {uploading ? 'Загрузка...' : 'Сохранить'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
