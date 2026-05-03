import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from sklearn.utils import resample
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
import os

# Load dataset
# The dataset is expected to be in the same directory as this script
file_path = 'E Commerce Dataset.xlsx'

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found. Please ensure the dataset is in the current directory.")
else:
    print(f"Loading data from {file_path}...")
    data = pd.read_excel(file_path, sheet_name='E Comm')
    data_desc = pd.read_excel(file_path, sheet_name='Data Dict', header=1, usecols=[1,2,3])

    ## **Diving To The Dataset**
    print('Data shape: %d rows and %d cols.' % data.shape)
    data.info()

    total_na = data.isnull().sum().sum()
    print(f"Total missing values: {total_na} ({ round((total_na/data.shape[0])*100, 2) }%)")

    # Handle missing values with median
    for col in data.columns:
        if data[col].isnull().sum() > 0:
            data[col].fillna(data[col].median(), inplace=True)
            
    print("Missing values after handling:")
    print(data.isnull().sum())

    ## **Data Preprocessing**
    # Create function to convert column with dtype object to integer
    def object_to_int(x):
        if x.dtype == 'object':
            x = LabelEncoder().fit_transform(x)
        return x

    # Convert column dtype object to int
    data = data.apply(lambda x : object_to_int(x))

    # Balance dataset with oversampling
    data_0 = data.loc[data['Churn'] == 0]
    data_1 = data.loc[data['Churn'] == 1]

    n_0 = len(data_0)
    data_oversampling = resample(data_1, replace=True, n_samples=n_0, random_state=42)
    data_new = pd.concat([data_oversampling, data_0])
    data_new = data_new.sample(frac=1)
    data_new.reset_index(drop=True, inplace=True)

    print("Churn value counts after oversampling:")
    print(data_new['Churn'].value_counts())

    ## **Machine Learning Model**
    X = data_new.drop(['Churn'], axis=1)
    y = data_new['Churn']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    ### Logistic Regression
    print("\n--- Logistic Regression ---")
    logreg = LogisticRegression(solver='lbfgs', max_iter=1000)
    logreg.fit(X_train, y_train)
    logreg_prediction = logreg.predict(X_test)
    print('Accuracy Score: %s ' % accuracy_score(y_test, logreg_prediction))
    print(classification_report(y_test, logreg_prediction))

    ### K-Nearest Neighbor (KNN)
    print("\n--- K-Nearest Neighbor (KNN) ---")
    knn = KNeighborsClassifier()
    knn.fit(X_train, y_train)
    knn_prediction = knn.predict(X_test) # Fixed bug in user code where it used logreg_prediction
    print('Accuracy Score: %s ' % accuracy_score(y_test, knn_prediction))
    print(classification_report(y_test, knn_prediction))

    ### Support Vector Machine (SVM)
    print("\n--- Support Vector Machine (SVM) ---")
    svc = SVC()
    svc.fit(X_train, y_train)
    svc_prediction = svc.predict(X_test)
    print('Accuracy Score: %s' % accuracy_score(y_test, svc_prediction))
    print(classification_report(y_test, svc_prediction))

    print("\nAnalysis Complete.")
