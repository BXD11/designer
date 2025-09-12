'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { 
  Send,
  Paperclip,
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Image,
  FileText,
  Check,
  CheckCheck,
  Clock,
  Star,
  Archive,
  Trash2,
  User,
  Bot,
  HelpCircle
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    name: 'أحمد محمد',
    avatar: 'AM',
    role: 'designer',
    lastMessage: 'التصميم جاهز للمراجعة',
    lastMessageTime: '10:30 ص',
    unreadCount: 2,
    isOnline: true,
    messages: [
      { id: '1', sender: 'أحمد محمد', content: 'مرحباً، بدأت العمل على التصميم', time: '9:00 ص', isRead: true },
      { id: '2', sender: 'me', content: 'ممتاز، في انتظار النتيجة', time: '9:15 ص', isRead: true },
      { id: '3', sender: 'أحمد محمد', content: 'التصميم جاهز للمراجعة', time: '10:30 ص', isRead: false },
    ]
  },
  {
    id: '2',
    name: 'الدعم الفني',
    avatar: 'ST',
    role: 'support',
    lastMessage: 'كيف يمكنني مساعدتك؟',
    lastMessageTime: 'أمس',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: '1', sender: 'الدعم الفني', content: 'مرحباً! كيف يمكنني مساعدتك؟', time: 'أمس 2:00 م', isRead: true },
      { id: '2', sender: 'me', content: 'أريد الاستفسار عن خدماتكم', time: 'أمس 2:05 م', isRead: true },
    ]
  },
  {
    id: '3',
    name: 'سارة أحمد',
    avatar: 'SA',
    role: 'designer',
    lastMessage: 'سأرسل لك التعديلات قريباً',
    lastMessageTime: 'منذ يومين',
    unreadCount: 0,
    isOnline: false,
    messages: []
  }
]

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const isNewContact = searchParams.get('new') === 'contact'
  const isQuickMessage = searchParams.get('new') === 'quick'
  
  const [selectedConversation, setSelectedConversation] = useState(isNewContact ? '2' : mockConversations[0].id)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = mockConversations.find(c => c.id === selectedConversation)
  const filteredConversations = mockConversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentConversation?.messages])

  useEffect(() => {
    if (isNewContact || isQuickMessage) {
      setSelectedConversation('2') // Select support conversation
      setMessage(isNewContact ? 'أريد التواصل معكم بخصوص...' : '')
    }
  }, [isNewContact, isQuickMessage])

  const sendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 dark:from-gray-900 dark:via-gray-900 dark:to-sky-950/20">
      <Header />
      
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-4">
        <div className="h-[calc(100vh-6rem)] glass rounded-2xl overflow-hidden flex">
          {/* Sidebar - Conversations List */}
          <div className="w-full md:w-96 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? 'bg-sky-50 dark:bg-sky-950/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        conversation.role === 'support' 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                          : 'bg-gradient-to-br from-sky-400 to-blue-600'
                      }`}>
                        {conversation.role === 'support' ? <Bot className="w-6 h-6" /> : conversation.avatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-sky-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* New Conversation Button */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="glow" className="w-full">
                <HelpCircle className="w-4 h-4 ml-2" />
                مساعدة فورية
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          {currentConversation && (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    currentConversation.role === 'support'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-sky-400 to-blue-600'
                  }`}>
                    {currentConversation.role === 'support' ? <Bot className="w-5 h-5" /> : currentConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation.isOnline ? 'متصل الآن' : 'غير متصل'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === 'me'
                        ? 'bg-gradient-to-r from-sky-500 to-sky-400 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        msg.sender === 'me' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sender === 'me' && (
                          msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب رسالتك..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                      rows={1}
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="glow" 
                    size="icon"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}