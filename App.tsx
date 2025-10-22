import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

type CourseType = 'starter' | 'main meal' | 'dessert';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: string;
}

const ChefApp: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('starter');
  const [price, setPrice] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'menu'>('form');

  const courses: CourseType[] = ['starter', 'main meal', 'dessert'];

  const addMenuItem = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price)  >=100) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description: description,
      course: selectedCourse,
      price: parseFloat(price).toFixed(2),
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setSelectedCourse('starter');
    setPrice('');
    Alert.alert('Success', 'Menu item added successfully!');
  };

  const getCourseColor = (course: CourseType) => {
    switch (course) {
      case 'starter':
        return '#6907bfff'; //*Purple*//
      case 'main meal':
        return '#620bcdff'; //*Purple*//
      case 'dessert':
        return '#6504abff'; //*Purple*//
      default:
        return '#FF6B6B';
    }
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Add New Menu Item</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="#000000ff"
        value={dishName}
        onChangeText={setDishName}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#060607ff"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      
      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.courseContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.courseButton,
              selectedCourse === course && {
                backgroundColor: getCourseColor(course),
                borderColor: getCourseColor(course),
              },
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.courseButtonText,
                selectedCourse === course && styles.courseButtonTextSelected,
              ]}
            >
              {course.charAt(0).toUpperCase() + course.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#000000ff"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      
      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add to Menu</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <Text style={styles.sectionTitle}>Chef's Menu</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total Items: <Text style={styles.totalCount}>{menuItems.length}</Text>
          </Text>
        </View>
      </View>

      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No menu items yet.</Text>
          <Text style={styles.emptyStateSubText}>
            Start by adding some delicious dishes!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.menuList}>
          {menuItems.map((item) => (
            <View
              key={item.id}
              style={[
                styles.menuItem,
                { borderLeftColor: getCourseColor(item.course) },
              ]}
            >
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>${item.price}</Text>
              </View>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <View style={styles.courseBadge}>
                <Text
                  style={[
                    styles.courseBadgeText,
                    { color: getCourseColor(item.course) },
                  ]}
                >
                  {item.course.charAt(0).toUpperCase() + item.course.slice(1)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}> Destiny Bond!!!</Text>
        <Text style={styles.welcomeSubtitle}>
          "Crafting Heavenly Dishes & Menus!"
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'form' && styles.activeTab]}
          onPress={() => setActiveTab('form')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'form' && styles.activeTabText,
            ]}
          >
            Add Item
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'menu' && styles.activeTabText,
            ]}
          >
            View Menu ({menuItems.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'form' ? renderForm() : renderMenu()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  header: {
    backgroundColor: '#6d06cdff',
    padding: 20,
    paddingTop: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#000000ff',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#6d06cdff',
    borderBottomWidth: 1,
    borderBottomColor: '#6d06cdff',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000ff',
  },
  tabText: {
    fontSize: 16,
    color: '#000000ff',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000ff',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  menuContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#000000ff',
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000ff',
    marginBottom: 10,
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courseButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000ff',
    alignItems: 'center',
  },
  courseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffffff',
  },
  courseButtonTextSelected: {
    color: '#000000ff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6d06cdff',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    backgroundColor: '#ffffffff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalText: {
    color: '#000000ff',
    fontSize: 14,
    fontWeight: '600',
  },
  totalCount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#6C757D',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#ADB5BD',
    textAlign: 'center',
  },
  menuList: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
    flex: 1,
    marginRight: 10,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#000000ff',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  courseBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ChefApp;