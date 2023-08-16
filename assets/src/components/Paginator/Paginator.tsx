import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PaginateType } from './Paginator.type';

type PaginatorProps = {
  paginate: PaginateType,
  path: string;
  onNext: () => void;
  onPrevious: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({ 
  paginate,
  onNext,
  onPrevious,
}) => {
  const currentPage = paginate.currentPage ?? 1;
  const lastPage = paginate.lastPage ?? 1;
  return (
    <>
      { lastPage > 1 ? 
        <View style={styles.container}>
          <TouchableOpacity onPress={onPrevious} disabled={currentPage <= 1} style={[styles.button, currentPage <= 1 && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage <= 1 && styles.disabledText]}>前へ</Text>
          </TouchableOpacity>
          <Text style={styles.currentPageText}>{currentPage} / {lastPage}</Text>
          <TouchableOpacity onPress={onNext} disabled={currentPage >= lastPage} style={[styles.button, currentPage >= lastPage && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage >= lastPage && styles.disabledText]}>次へ</Text>
          </TouchableOpacity>
        </View>
        : <></>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pageText: {
    fontSize: 16,
    color: '#FFF',
  },
  currentPageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)', // 半透明の白
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3498db', // 青色
    borderRadius: 5,
    elevation: 2, // Androidの影
    shadowOffset: { width: 1, height: 1 }, // iOSの影
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabledButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.5)', // 半透明の青
  }
});

export default Paginator;
